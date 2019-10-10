/// \value stringified json object or a standard type
/// \returns true if succeed
function saveLocal(name, value) {
    let valueToSave = (typeof value == 'object') ? JSON.stringify(value) : (''+value);
    // If the platform supports localStorage, then save the value
    try {
        localStorage.setItem(name, valueToSave);
        return true;
    }
    catch(e) {
        // Most likely cause of errors is a very old browser that doesn't support localStorage (fail silently)
        console.warn("saving error");
        return false;
    }
}

/// \returns loaded value or specified defaultValue in case of error
function loadLocal(name, defaultValue) {
    // If the platform supports localStorage, then load the selection
    try {
        let val = localStorage.getItem(name);
        return (val === null) ? defaultValue : val;
    }
    catch(e) {
        // Either no selection in localStorage or browser does not support localStorage (fail silently)
        console.warn("can\'t load from localstorage: ", name);
        return defaultValue;
    }
}
