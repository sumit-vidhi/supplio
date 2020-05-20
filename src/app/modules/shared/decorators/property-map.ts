/**
 * @function  MapProperty
 * @description
 * Define mapProperty property mapper
 * It can be used to define the data type, extract predefined meta data and perform data transformation
 * It provides a way to store the meta-data
 * @example:
 * @propertyMap('title')
 * public name: string;
 */

export function MapProperty(sourceProperty: string) {
    return function (target: any, propertyKey: string) {
        if (!target.constructor._propertyMap) {
            target.constructor._propertyMap = {};
        }
        target.constructor._propertyMap[propertyKey] = sourceProperty;
    };
}
