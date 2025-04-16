export type ButtonTypes = {
    title: string,
    width?: number,
    height?:number,
    fntSize?:number,
    btnColor?: any,
    txtColorr?: any,
    onPress?:() =>  void,
    icon?: any,
    disabled?:any,
};

export type SmallBtnTypes = {
    title:string,
    width?:number,
    height?:number,
    fntSize?:number,
    fontWeight?:string,
    btnColor?:any,
    txtColor?:any,
    onPress?: () => void,
    icon?: any
    borderRadious?: any,
    borderWidth?: any,
    borderColor?: any,
    disabled?:any,
};
