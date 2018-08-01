import React from 'react';

function attachField() {
    console.warn("missing FormManager to attach field");
}

function detachField(){
    console.warn("missing FormManager to detach field");
}

function forceUpdate(){
    console.warn("missing FormManager to forceUpdate");
}

export const FormContext = React.createContext({
    store: new Map(),
    attachField,
    detachField,
    refresh,
});
