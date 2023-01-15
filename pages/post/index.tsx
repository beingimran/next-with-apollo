import ContentPostInput from "../../components/contentPostInput";
import ContentPostArea from "../../components/contentPostArea";
import Header from "../../components/header";
import Profile from "../../components/profile";

export default function Content() {
    return (
        <div>
            <Header></Header>
           
            <ContentPostInput/>
            {/* <Profile/> */}
            <ContentPostArea/>
            </div>
    );
};