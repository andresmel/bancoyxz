
export interface User {
    id:number, 
    name:string, 
    username:string
    email:string
    password:string
    photo:string
    createdAt:Date
    updatedAt:Date
}

export interface account_details{
    id:number
    id_user:number
    account_number:string
    balance:number
    product_type:string
    createdAt:Date
    updatedAt:Date
}

 const users: User[] = [
        {"id":1, "name":"John Doe", "username":"johndoe", "email":"johndoe@example.com", "password":"password123", "photo":"https://example.com/photo.jpg", "createdAt":new Date(), "updatedAt":new Date()},
        {"id":2, "name":"Jane Smith", "username":"janesmith", "email":"janesmith@example.com", "password":"password456", "photo":"https://example.com/photo2.jpg", "createdAt":new Date(), "updatedAt":new Date()},
        {"id":3, "name":"Alice Johnson", "username":"alicejohnson", "email":"alicejohnson@example.com", "password":"password789", "photo":"https://example.com/photo3.jpg", "createdAt":new Date(), "updatedAt":new Date()}
]


const accountDetails: account_details[]=[
    {"id":1, "id_user":1, "account_number":"1234567890", "balance":100000, "product_type":"savings", "createdAt":new Date(), "updatedAt":new Date()},
    {"id":2, "id_user":2, "account_number":"0987654321", "balance":200000, "product_type":"checking", "createdAt":new Date(), "updatedAt":new Date()},
    {"id":3, "id_user":3, "account_number":"1122334455", "balance":300000, "product_type":"savings", "createdAt":new Date(), "updatedAt":new Date()}
]




export default function repository(){
     return{
        users,
        accountDetails
     }
}
  
   