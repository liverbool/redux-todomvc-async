const loading = (state = false, action) => {
    return !(action.type.endsWith('_FAIL') || action.type.endsWith('_DONE'))
}

export default loading
