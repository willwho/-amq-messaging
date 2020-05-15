//---------------------------------------------------------------------------------------
interface String {
    isNullOrWhiteSpace(): boolean;
    equalsCaseInsensitive(value: string): boolean;
}

String.prototype.isNullOrWhiteSpace = function () {
    return this === null || this === undefined || this.trim().length === 0;
};

String.prototype.equalsCaseInsensitive = function (value: string) {
    let thisStr = this || '';
    let valueStr = value || '';

    return thisStr.toLowerCase() === valueStr.toLowerCase();
};

