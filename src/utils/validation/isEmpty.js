const isEmpty = function(value) {
    return  (!value || value.length === 0 || /^\s*$/.test(value));
  };
  
  export default isEmpty;