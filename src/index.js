import React, { Component } from 'react';
import { FormContext } from './form-context';



// props onConfirm
class FormManager extends Component {
    constructor() { 
        this.state = {
            store: new Map(),
            forceUpdate: this.forceUpdate,
            attachField: this.attachField,
            detachField: this.detachField,
        };
    }

    attachField = (fieldInstance) => {
        const store = new Map(this.state.store);
        store.set(fieldInstance.getKey(), fieldInstance);
        this.setState({store});
    }

    detachField = (fieldInstance) => {
        const store = new Map(this.state.store);
        store.delete(fieldInstance.getKey());
        this.setState({store});
    }

    onSubmit = () => {
        
    }

    render() {
      const { children, ...props } = this.props;  
      return (
        <FormContext.Provider value={this.state}>
            <form {...props} onSubmit={this.onSubmit}>
                { children }
            </form>
        </FormContext.Provider>
      );
    }
  }
  
  export default FormManager;