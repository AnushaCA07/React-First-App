export const get = (url) => {
    return fetch(url, {
      headers: getHeader(),
    }).then(status);
  };
  
  export const post = (url, body) => {
    return fetch(url, {
      method: 'POST',
      headers: getHeader(),
      body: JSON.stringify(body),
    }).then(status);
  }; 

  
  const getHeader = () => {
    return {
      'Content-Type': 'application/json'
    };
  };
  
  const status = (res) => {
    return new Promise((resolve, reject) => {
      if (res.status === 401) {
        window.location.replace('/');
      } else if (res.status >= 200 && res.status < 300) {
        resolve(res.json());
      } else if (res.status === 500 || res.status === 404) {
        reject({ error: 'Error Processing Request' });
      } else {
        res.json().then((parsedResponse) => {
          reject(parsedResponse);
        });
      }
    });
  };
  