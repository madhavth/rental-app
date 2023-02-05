import {Property} from "./property";
import {MetaData} from "./metaData";

export default interface PropertyResponse {
  success: boolean,
  data: {
    properties: Array<Property>,
    metaData: MetaData
  }
}
