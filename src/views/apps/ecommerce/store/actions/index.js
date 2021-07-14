import axios from 'axios'
import { getGuestData, getUserData, isUserLoggedIn } from '../../../../../auth/utils'

// ** GET Wishlist Items
export const getWishlistItems = () => {
  return (dispatch, getState) => {
    if (isUserLoggedIn()) {
      const userData = getUserData()
      const profileUid = userData.profile.uid
      return axios.get(`profiles/${profileUid}/store/wishlists`).then(res => {
        dispatch({ type: 'GET_WISHLIST', data: res.data })
      })
    } else {
      const guest = getGuestData()
      const guestUid = guest.uid
      const wishlistUid = guest.wishlist.uid 
      return axios.get(`/guests/${guestUid}/store/wishlists/${wishlistUid}`).then(res => {
        dispatch({ type: 'GET_WISHLIST', data: res.data })
      })
    }
  }
}

// ** GET Products
export const getProducts = params => {
  return (dispatch, getState) => {
    return axios.get('/search/store/products', { params }).then(res => {
      // return axios.get('/apps/ecommerce/products', { params }).then(res => {
      dispatch({ type: 'GET_PRODUCTS', data: res.data, params })
      dispatch(getWishlistItems())
    })
  }
}

// * GET Wishlists List Items
export const getWishlist = (id) => {
return (dispatch, getState) => {
const state = getState()
const userData = getUserData()
const profileUid = userData.profile.uid
const wishlistsUid = id
return axios.get(`/profiles/${profileUid}/store/wishlists/${wishlistsUid}/items`).then(res => {
dispatch({ type: 'GET_WISHLIST_LIST', data: res.data })
})
}
}

// * Get Wishlist List Items
export const getWishlistListItem = (id) => {
  return (dispatch, getState) => {
    if (isUserLoggedIn()) {
    const state = getState()
    const userData = getUserData()
    const profileUid = userData.profile.uid
    const wishlistsUid = id
    return axios.get(`/profiles/${profileUid}/store/wishlists/${wishlistsUid}/items`).then(res => {
    dispatch({ type: 'GET_WISHLIST_LIST', data: res.data })
    })
  } else {
    const guest = getGuestData()
    const guestUid = guest.uid
    const wishlistUid = guest.wishlist.uid
    return axios.get(`/guests/${guestUid}/store/wishlists/${wishlistUid}`).then(res => {
      dispatch({ type: 'GET_WISHLIST_LIST', data: res.data })
    })
  }
}
}
// ** DELETE Wishlist Item
export const deleteWishlistItem = id => {
  return dispatch => {
    return axios.delete(`/apps/ecommerce/wishlist/${id}`).then(res => {
      dispatch({ type: 'DELETE_WISHLIST_ITEM', data: res.data })
      dispatch(getWishlistItems())
    })
  }
}

export const getCartItems = () => {
  return dispatch => {
    if (isUserLoggedIn()) {
      const userData = getUserData()
    const profileUid = userData.profile.uid
    return axios.get(`/social/profiles/${profileUid}/cart`).then(res => {
      dispatch({ type: 'GET_CART', data: res.data })
    })
    } else {
      const guest = getGuestData()
      const cartUid = guest.cart.uid
      return axios.get(`/store/carts/${cartUid}/items`).then(res => {
        dispatch({ type: 'GET_CART', data: res.data })
      })
    }
  }
}

// ** Add Items to the Cart
export const addToCart = (cart_uid, product_slug, quantity) => {
  return dispatch => {
    return axios.post(`/store/carts/${cart_uid}/items`, { product_slug, quantity, region: "RO%7C10" }).then((res) => {
      dispatch(getCartItems())
    })
  }
}

// ** DELETE Cart Items
export const deleteCartItem = (cart_uid, item_uid) => {
  return dispatch => {
    return axios.delete(`/store/carts/${cart_uid}/items/${item_uid}`, {
      params: { 
        region : "RO%7C10", 
        with : "true" 
      }
    }).then(res => {
      dispatch(getCartItems())
    })
  }
}

// ** UPDATE Cart Items 
export const updateCartItem = (cart_uid, item_uid, quantity) => {
  return dispatch => {
    return axios.put(`/store/carts/${cart_uid}/items/${item_uid}`, { quantity }, {
      params: { 
        region : "RO%7C10", 
        with : "true" 
      }
    }).then(res => {
      dispatch(getCartItems())
    })
  }
}


// ** GET Single Product
export const getProduct = slug => {
  return dispatch => {
    return axios.get(`/store/products/slug/${slug}`).then(res => {
      dispatch({ type: 'GET_PRODUCT', data: res.data })
    })
  }
}

// ** Add Item to Wishlist
export const addToWishlist = id => {
  return dispatch => {
    return axios.post('/apps/ecommerce/wishlist', { productId: id }).then(() => {
      dispatch({ type: 'ADD_TO_WISHLIST' })
    })
  }
}

// ** DELETE product(item) from wishlist
export const deleteItemFromWishlist = (wishlistUid, itemUid) => {
  return dispatch => {
  if (isUserLoggedIn()) {
    const userData = getUserData()
    const profileUid = userData.profile.uid
    return axios.delete(`/profiles/${profileUid}/store/wishlists/${wishlistUid}/items/${itemUid}`).then(res => {
     dispatch(getWishlistListItem(wishlistUid))
     dispatch(getWishlistItems())
    })
  } else {
    const guest = getGuestData()
    const guestUid = guest.uid
    const wishlistUid = guest.wishlist.uid
    return axios.delete(`/guests/${guestUid}/store/wishlists/${wishlistUid}/items/${itemUid}`).then(res => {
      dispatch(getWishlistListItem(wishlistUid))
      dispatch(getWishlistItems())
    })
  }
}
}

// ** CREATE Wishlist List
export const addWishlistList = (name, kind) => {
  const userData = getUserData()
  const profileUid = userData.profile.uid
  return dispatch => {
    return axios.post(`/profiles/${profileUid}/store/wishlists`, { name, private: kind }).then((res) => {
     dispatch(getWishlistItems())   
    })
  }
}

// ** DELETE WishlistList
export const deleteWishlistList = wishlist_uid => {
  const userData = getUserData()
  const profileUid = userData.profile.uid
  return dispatch => {
    return axios.delete(`/profiles/${profileUid}/store/wishlists/${wishlist_uid}`).then(res => {
     dispatch(getWishlistItems())
    })
  }
}

// ** RELATED Products
export const getRelatedProduct = () => {
  return (dispatch, getState) => {
    const state = getState()
    const productUid = state.ecommerce.productDetail.data.uid
    const relationship = 'products'
    return axios.get(`store/products/${productUid}/relationships/${relationship}?with=suppliers,brands`).then(res => {
      dispatch({ type: 'GET_RELATED_PRODUCT', data: res.data })
    })
  }
}

export const getCategories = () => {
  return dispatch => {
    return axios.get(`/store/categories`, {
      params: {
        mode: 'tree',
        per_page: '10000'
      }
    }).then(res => {
      dispatch({ type: 'GET_CATEGORIES', data: res.data })
    })
  }
}

export const getReviews = () => {
  return (dispatch, getState) => {
    const state = getState()
    const productUid = state.ecommerce.productDetail.data.uid

    return axios.get(`/store/products/${productUid}/reviews`).then(res => {
      dispatch({ type: 'GET_PRODUCT_REVIEW', data: res.data })
    })
  }
}

export const addReview = (productUid, customerRating, title, content) => {
  const userData = getUserData()

  const authorUid = userData.profile.uid
  return dispatch => { 
    return axios.post(`/store/products/${productUid}/reviews`, { author_uid: authorUid,
      customer_rating: customerRating,
      title,
      content
    }).then(res => {
      dispatch({ type: 'ADD_PRODUCT_REVIEW', data: res.data })
      dispatch(getReviews())
    })
  }
}

// ** Add Items to the Wishlist list
export const addItemsToWishlistList = (wishlist_uid, product_uid) => {
  return dispatch => {
    if (isUserLoggedIn()) {
      const userData = getUserData()
      const profileUid = userData.profile.uid
      return axios.post(`/profiles/${profileUid}/store/wishlists/${wishlist_uid}/items`, { product_uid }).then(res => {
        dispatch(getWishlistItems())
      })
    } else {
      const guest = getGuestData()
      const guestUid = guest.uid
      const wishlistUid = guest.wishlist.uid
      return axios.post(`/guests/${guestUid}/store/wishlists/${wishlistUid}/items`, { product_uid }).then(res => {
        dispatch(getWishlistItems())
      })
    }
  }
}

// ** delete Items to the Wishlist list
export const deleteItemsFromWishlistList = (wishlist_uid, product_uid) => {
  return dispatch => {
    if (isUserLoggedIn()) {
      const userData = getUserData()
      const profileUid = userData.profile.uid
      return axios.delete(`/profiles/${profileUid}/store/wishlists/${wishlist_uid}/items/${product_uid}`).then(res => {
        dispatch(getWishlistItems())
      })
    } else {
      const guest = getGuestData()
      const guestUid = guest.uid
      const wishlistUid = guest.wishlist.uid
      return axios.delete(`/guests/${guestUid}/store/wishlists/${wishlistUid}/items/${product_uid}`).then(res => {
        dispatch(getWishlistItems())
      })
    }
  }
}

// ** Like Product Review
export const likeReview = (product_uid, review_uid) => {
  return dispatch => {
    return axios.post(`/store/products/${product_uid}/reviews/${review_uid}/votes`).then((res) => {
      dispatch(getReviews())
    })
  }
}

// ** Get All Orders
export const getAllOrders = () => {
  return dispatch => {
    const userData = getUserData()
    const profileUid = userData.profile.uid
    return axios.get(`/profiles/${profileUid}/orders?page=1&per_page=3`).then((res) => {
      dispatch({ type: 'GET_ALL_ORDERS', data: res.data })
    })
  }
}

// ** Get All Orders
export const getAllAdresses = () => {
  return dispatch => {
    const userData = getUserData()
    const profileUid = userData.profile.uid
    return axios.get(`/profiles/${profileUid}/store/addresses?sort=created_at:desc`).then((res) => {
      dispatch({ type: 'GET_ALL_ADRESSES', data: res.data })
    })
  }
}


export const getAllReviewsCounter = () => {
  return dispatch => {
    const userData = getUserData()
    const profileUid = userData.profile.uid
    return axios.get(`/profiles/${profileUid}/store/reviews?with=products,counters`).then((res) => {
      dispatch({ type: 'GET_ALL_REVIEWS_COUNTER', data: res.data })
    })
  }
}
