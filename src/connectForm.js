// retrieve values from one or several field

import React, { Component } from 'react';
import topath from lodash.topath;
import { FormContext } from './form-context';

function applyValidators(validators, value) {
    if (typeof validators === 'function') {
        return validators(value);
    } else {
        for (let i = 0, l = validators.length; i < l; i++) {
            const error = validators[i](value);
            if (error) {
                return error;
            }
            // loop
        }
    }
}

/*
    trim
    required
    validators
    value
    path

    // onchange, onError, value
*/

export const REQUIRED_FIELD = 'REQUIRED_FIELD';

function fieldWrapperFactory(WrappedComponent, formContext) {
    return class FieldWrapper extends Component {
        static defaultProps = {
            trim: true,
        };

        constructor(props){
            super(props);

            this.path = topath(this.props.path); // convert [0, 1] & "0.1" to ["0", "1"]
            this.key = '[' + this.path.map(x => `"${x}"`).join(',') + ']';

            this.state = {
                value: null,
                error: null,
            }
        }
    
        componentDidMount() {
            formContext.attachField(this);
        }
    
        componentWillUnmount() {
            formContext.detachField(this);    
        }

        getPath() {
            return this.path;
        }

        getKey() {
            return this.key;
        }

        trimValue(value) {
            return typeof value === 'string' && this.props.trim ? value.trim() : value;
        }

        validate = (value) => {
            const { validators } = this.props;
            value = this.trimValue(value);
            let error = null;
            
            if (mandatory && (value === '' || value === null || typeof value === 'undefined')) {
                error = REQUIRED_FIELD;
            } else if (validators) {
                error = applyValidators(validators, value);
            }
            this.setState({error});
            return error;
        }

        updateValue = (value) => {
            if(value !== this.state.value) {
                return; // maybe some problem here
            } 
            this.setState({value});
            const error =  this.validate(value);
            formContext.forceUpdate(); // re-render the form
            return error;
        }

        validateOnConfirm() {
            return this.validate(this.state.value);
        }
    
        render() {
            const { ...props } = this.props;  
            const { value } = this.state;
            return (
                <WrappedComponent 
                    {...props} 
                    value={value} 
                    validate={this.validate}
                    updateValue={this.updateValue} />
            )
        }
    }
}


function bindField(WrappedComponent) { // HOC
    return function ContextInjector(props) {
        return (
            <FormContext.Consumer>
                {formContext => {
                    const FieldWrapper = fieldWrapperFactory(WrappedComponent, formContext);
                    return React.createElement(FieldWrapper, props);
                }
            }
            </FormContext.Consumer>
        );
    }
}

export default bindField;