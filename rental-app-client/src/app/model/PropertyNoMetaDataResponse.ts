import {Property} from "./property";

export default interface PropertyNoMetaDataResponse {
  success: boolean,
  data?: [Property]
}
