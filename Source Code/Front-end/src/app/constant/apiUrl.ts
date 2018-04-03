export const Domain = 'https://api.chicken2018.club/api/';
// export const Domain = 'http://localhost:62025/api/';
// Product URL
export const GetAllProduct = Domain + 'product';
export const GetAllCategories = Domain + 'categories';
export const ProductReview = Domain + 'product/review';
export const ProductCategory = Domain + 'product/category';
export const Product = Domain + 'product';

// User URL
export const GetUser = Domain + 'users';
export const SignUp = Domain + 'users/signup';
export const SignIn = Domain + 'users/signin';
export const Upload = Domain + 'users/upload';
export const Review = Domain + 'users/review';

export const Comment = Domain + 'users/comment';
export const Store = Domain + 'users/store';
export const OpenStore = Domain + 'users/open-store';
export const Image = Domain + 'users/image';
export const FavoriteList = Domain + 'users/favorite-list';
// export const FavoriteListWithUser = Domain + 'users/favorite-list';
// export const FavoriteList = Domain + 'favorite-list';

export const Profile = Domain + 'users/profile';
export const Settings = Domain + 'users/settings';
export const ChangePassword = Domain + 'users/change-password';

// Store URL
export const GetStore = Domain + 'stores';
export const GetStoreAddresses = Domain + 'stores/addresses';
export const StoreReview = Domain + 'stores/review';

// Key of LocalStorage
export const AuthToken = "auth_token";
export const UserId = "user_id";

// Search URL
export const SearchPaging = Domain + 'search';

// Image URL
export const GetImageByStoreId = Domain + 'image/store';
