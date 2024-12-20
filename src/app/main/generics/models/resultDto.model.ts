export class GetAllResultDto<T> {
    result!: {
        totalCount: number;
        items: T;
    };
    targetUrl!: string | null;
    success!: boolean;
    error!: string | null;
    unAuthorizedRequest!: boolean;
    __abp!: boolean;
}

export class ResultDto<T> {
    result!: T;
    targetUrl!: string | null;
    success!: boolean;
    error!: string | null;
    unAuthorizedRequest!: boolean;
    __abp!: boolean;
}