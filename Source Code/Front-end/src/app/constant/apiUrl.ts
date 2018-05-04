export const Domain = 'https://api.chicken2018.club/api/';
// export const Domain = 'http://localhost:62025/api/';

export const ImageDomain = 'https://api.chicken2018.club/';
// Product URL
export const GetAllProduct = Domain + 'product';
export const GetAllProductWithoutDto = Domain + 'product/getAllProductsWithoutDto';
export const GetAllCategories = Domain + 'categories';
export const ProductReview = Domain + 'product/review';
export const ProductCategory = Domain + 'product/category';
export const Product = Domain + 'product';

// User URL
export const GetUser = Domain + 'users';
export const GetAllUsers = Domain + 'users/getAll';
export const SignUp = Domain + 'users/signup';
export const SignIn = Domain + 'users/signin';
export const Upload = Domain + 'users/upload';
export const Review = Domain + 'users/review';

export const Comment = Domain + 'users/comment';
export const Store = Domain + 'users/store';
export const OpenStore = Domain + 'users/open-store';
export const UserImage = Domain + 'users/image';
export const FavoriteList = Domain + 'users/favorite-list';
// export const FavoriteListWithUser = Domain + 'users/favorite-list';
// export const FavoriteList = Domain + 'favorite-list';

export const Profile = Domain + 'users/profile';
export const Settings = Domain + 'users/settings';
export const ChangePassword = Domain + 'users/change-password';

// Store URL
export const GetStore = Domain + 'stores';
export const DeleteStore = Domain + 'stores';
export const GetStoreAddresses = Domain + 'stores/addresses';
export const StoreReview = Domain + 'stores/review';
export const StoreImage = Domain + 'stores/image';
export const StoreCategory = Domain + 'stores/category';

// Key of LocalStorage
export const AuthToken = "auth_token";
export const UserId = "user_id";

// Search URL
export const Search = Domain + 'search';

// Image URL
export const GetImageByStoreId = Domain + 'image/store';
