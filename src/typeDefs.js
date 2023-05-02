const typeDefs = `#graphql

type Products {
    _id: ID
    name:  String
    type: String
    description: String 
    price: Float
    stock: Float
    Imgurl: String 
}
type Users {
    _id: ID
    firstName:  String
    lastName: String
    email:  String   
    password:  String
}

type Query {
    getProducts: [Products]
    getUsers: [Users]
}
`;

export default typeDefs;
