/**
 * @description - interface used by the 'typed-rest-client/RestClient' from microsoft
 * @interface HttpBinData
 */
export interface HttpBinData {
    url: string;
    data: any;
    json: any;
    args?: any
}