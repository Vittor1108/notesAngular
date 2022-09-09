export default interface InterfaceNotes
{
  nameTask: string,
  descriptionNote: string
  date: string,
  email: string,
  id: number
}

export interface teste extends Array<InterfaceNotes>{}
