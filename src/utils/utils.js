export const updateObject = (state, updatedData) => {
  return {
    ...state,
    ...updatedData
  };
};

export const queryParam = function (ary) {
  return Object.keys(ary)
    .map(function (key) {
      if (Array.isArray(ary[key])) {
        var arrayParts = [];
        for (var i = 0; i < ary[key].length; i++) {
          arrayParts.push(encodeURIComponent(key + '[]') + '=' + encodeURIComponent(ary[key][i]));
        }
        return arrayParts.join('&');
      }
      return encodeURIComponent(key) + '=' + encodeURIComponent(ary[key]);
    })
    .join('&');
};


