export type WordType = {
    id: number
    category: SetNameType
    title: string
    meanings: string
    user_id: number
    created_at?: string
    updated_at?: string
}

export type SetNameType = 'next'|'current'|'done';

type HeadersType = {
    Authorization: string
}
export type OptionsType = {
    headers: HeadersType
}

// export type TSetProps = {
//     uid: number
//     options: OptionsType
//     token: string
// }
