import dayjs from 'dayjs';
export interface IFaqDto {
    id: string;
    title: string;
    content: string;
    date: string;
    dateObj: Date;
}
export const createFaqDto = (item: any): IFaqDto => {
    return {
        id: item.id,
        title: item.attributes.Name,
        content: item.attributes.Content,
        date: item.attributes.Date,
        dateObj: dayjs(item.attributes.Date).toDate(),
    };
};
