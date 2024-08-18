import {
  UserProps,
} from './User.props';

const User = ({
  className,
  fill,
}: UserProps): JSX.Element => (
  <svg
    className={className}
    fill={fill}
    overflow="hidden"
    viewBox="0 0 1024 1024"
  >
    <path d="M811.739 966.597H92.74c-10.326 0-18.697-8.371-18.697-18.697v-22.468c-.318-6.267-.911-40.604 21.004-78.307 13.716-23.598 33.431-43.861 58.598-60.225 30.493-19.829 69.116-33.909 114.796-41.849.233-.04.467-.076.701-.107.347-.047 35.499-4.859 71.209-14.273 61.895-16.318 67.308-30.743 67.346-30.884a18.697 18.697 0 011.573-4.095c.508-2.699 1.764-12.859-.638-40.08-6.101-69.136-42.12-109.995-71.061-142.826-9.128-10.355-17.749-20.133-24.387-29.723-28.64-41.372-31.297-88.416-31.396-90.399a19.365 19.365 0 01-.023-.933c0-18.78 9.363-27.418 17.624-35.041l.434-.401c.271-.251.442-.437.542-.557.093-1.341-.567-4.743-1.013-7.041-.17-.874-.34-1.751-.501-2.633-7.18-38.982-7.671-99.192-1.176-137.837 2.41-50.813 46.225-89.711 48.105-91.356l.215-.185c6.29-5.339 12.672-11.169 16.728-17.637.487-.776.828-1.377 1.066-1.837-.305-.787-.742-1.794-1.095-2.608-2.436-5.619-6.118-14.109-4.024-25.024 1.264-6.589 6.078-18.362 24.118-23.174 7.261-1.937 15.022-2.333 20.689-2.622l1.123-.058c22.39-1.179 46.273-2.177 70.435-.324 174.73 13.396 234.92 78.686 237.396 81.459.14.156.276.314.409.475 13.987 16.757 24.347 37.635 30.796 62.055 2.015 7.62 3.309 14.016 4.063 20.072 6.103 35.465 5.085 71.904 3.782 96.269-.733 13.675-2.257 28.03-4.8 45.176-.692 4.656.069 5.565.355 5.906.758.907 1.686 1.892 2.668 2.935 3.863 4.099 9.152 9.713 11.964 18.721 1.41 4.503 2.069 9.36 2.069 15.268 0 .311-.008.622-.023.933-.099 1.982-2.756 49.026-31.395 90.398-6.639 9.59-15.26 19.369-24.387 29.723-28.942 32.83-64.96 73.689-71.061 142.828-2.402 27.221-1.145 37.379-.638 40.08a18.83 18.83 0 011.573 4.094c.037.141 5.472 14.614 67.649 30.964 35.705 9.389 70.558 14.146 70.906 14.193.304.041.607.09.909.145 46.096 8.55 84.957 22.992 115.505 42.923 25.252 16.476 44.93 36.702 58.489 60.114 21.502 37.129 20.627 70.714 20.196 77.444v22.333c0 10.326-8.371 18.697-18.697 18.697H775.88c-10.326 0-18.697-8.371-18.697-18.697 0-10.326 8.371-18.697 18.697-18.697h158.19v-4.311c0-.687.009-1.106.082-1.769.104-1.508 1.627-28.332-16.349-58.131-10.82-17.938-26.59-33.609-46.87-46.581-26.1-16.693-59.762-28.968-100.052-36.483-4.64-.643-39.012-5.565-75.081-15.06-70.761-18.629-87.964-39.353-93.189-54.396-4.004-7.766-6.245-23.195-2.985-60.153 7.181-81.369 49.419-129.282 80.261-164.268 8.747-9.922 16.301-18.491 21.693-26.279 21.12-30.511 24.438-66.3 24.765-70.606-.033-2.252-.261-3.223-.362-3.55-.249-.798-1.897-2.547-3.49-4.238-1.25-1.327-2.668-2.833-4.136-4.587-7.95-9.504-10.783-21.079-8.66-35.385 2.368-15.96 3.781-29.206 4.449-41.684 1.951-36.502.914-63.748-3.364-88.341a19.238 19.238 0 01-.145-.983c-.531-4.438-1.531-9.354-3.148-15.469-4.987-18.884-12.727-34.771-23.007-47.233-1.714-1.748-15.385-15.125-45.883-29.676-54.884-26.184-120.792-35.85-166.418-39.349-21.935-1.681-44.442-.733-65.614.383l-1.179.06c-1.766.09-4.736.242-7.558.526 2.448 5.841 5.453 14.632 2.296 25.136-1.185 3.94-3.003 7.792-5.723 12.129-6.732 10.733-15.924 19.236-24.055 26.145-1.597 1.442-34.223 31.356-35.351 65.738-.029.87-.118 1.737-.267 2.594-5.972 34.304-5.569 90.78.898 125.894.14.765.289 1.526.436 2.283 1.98 10.205 5.295 27.284-10.88 42.202l-.435.402c-2.087 1.925-4.944 4.561-5.416 5.469.003 0-.133.427-.165 1.584.328 4.296 3.654 40.06 24.764 70.555 5.392 7.788 12.946 16.357 21.693 26.279 30.841 34.985 73.079 82.899 80.26 164.266 3.26 36.959 1.019 52.388-2.985 60.154-5.226 15.043-22.428 35.767-93.189 54.396-36.365 9.574-71.006 14.497-75.189 15.074-39.834 6.958-73.196 18.883-99.16 35.445-20.186 12.876-35.971 28.599-46.919 46.732-18.282 30.282-17.133 57.861-17.055 59.336.05.543.054.868.054 1.434v4.309h700.077M631.465 689.874zm-217.424 0z" />
  </svg>
);

export default User;
