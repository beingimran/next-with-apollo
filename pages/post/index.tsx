import { useQuery } from "@apollo/client";
import ContentPostInput from "../../components/contentPostInput";
// import ContentPostArea from "./ContentPostArea";
import {GET_ALL_CATEGORY} from '../../graphql/queries'

export default function Content() {
    const {loading,error,data} = useQuery(GET_ALL_CATEGORY)
    let category = data?.getAllCategory
    console.log(category)
    if(!category){
        console.log(category)
    //  category = category.map((p:any)=>{console.log(p)})
    }
   
    return (
            <ContentPostInput/>
    );
};