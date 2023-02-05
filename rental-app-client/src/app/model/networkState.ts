export default interface NetworkState<T> {
  loading: boolean,
  error: boolean,
  data?: T,
  message?: string
}
