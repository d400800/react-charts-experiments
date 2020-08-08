export const onEnterPress = (cb) => {
    return (e) => {
        if (e.key === 'Enter') {
            cb(e);
        }
    }
};
