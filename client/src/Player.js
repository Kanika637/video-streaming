// this is a kind of player where all the videos will be played
import React,{Component} from "react"

export default class Player extends Component{

    constructor(props){
        super(props);
        this.state={
            videoId:this.props.match.params.id,
            videoData:{}
        };

    }

    async componentDidMount(){
        try{
            const res=await fetch(`http://localhost:4000/video/${this.state.videoId}/data`);
            const data=await res.json();
            this.setState({videoData:data});
        }catch(error){
            console.log(error);
        }
    }
    render(){
        return(
            <div className="app">
                <header className="app-header">
                    <video controls muted autoplay>
                        <source src={`http://localhost:4000/video/${this.state.videoId}`} type="video/mp4"></source>
                    </video>
                    <h1>{this.state.videoData.name}</h1>
                </header>
            </div>
        )
    }
}
