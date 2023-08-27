export function fetchAllProducts() {
    return new Promise(async (resolve) => {
        //TODO
        const response = await fetch('http://localhost:8080/products')
        const data = await response.json();
        resolve({ data })
    }
    );
}

function fetchProductsByFilters(filter) {
    // filter = {"category":"smartphone"}
    // TODO : on server we will support multi values
    let queryString = '';
    for (let key in filter) {
        queryString += `${key}=${filter[key]}&`
    }

    return new Promise(async (resolve) => {
        //TODO: we will not hard-code server URL here
        const response = await fetch('http://localhost:8080/products?' + queryString)
        const data = await response.json()
        resolve({ data })
    }
    );
}

export {fetchProductsByFilters};


// export async function fetchAllProducts() {
//     try {
//       const response = await fetch('http://localhost:8080/products');
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       throw new Error('Failed to fetch products: ' + error.message);
//     }
//   }
