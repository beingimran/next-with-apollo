import { useQuery } from "@apollo/client"
import { on } from "events"
import { GET_ALL_CATEGORY } from "../graphql/queries"

interface Props {
    onChange :(e: { target: { value: any; name: string; }; }) => void;
}

export default function SelectField({onChange} : Props){
    const {loading,error,data} = useQuery(GET_ALL_CATEGORY)
    let category = []
      if (!loading){
          category = data?.getAllCategory
          category = category.map((p:any)=>p.title)
      }
    return(
        <div className="w-full md:w-1/2 px-3">
          <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" name="category" onChange={onChange}>
            {category.map((cat : any ,index : any) => (
                <option key={index}>{cat}</option>
            ))}
          </select>
        </div>
    );
}