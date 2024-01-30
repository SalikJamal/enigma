export interface IReactChildren {
    children: React.ReactNode;
}

export interface IChatCompletionMessageParam {
    role: string;
    content: string;
}

export interface IAPILimitProp {
    APILimitCount: number;
}