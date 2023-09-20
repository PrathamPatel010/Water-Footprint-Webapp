import React, { useState } from 'react';
import axios from 'axios';
const MainPage = () => {

    const backend_base = import.meta.env.VITE_BACKEND_BASE;
    const [uploadPercentage,setUploadPercentage] = useState(0);

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('file',e.target.elements.file.files[0]);
        
        try{
            const response = await axios.post(`${backend_base}/api/upload`,formData,{
                onUploadProgress:(progressEvent)=>{
                    const percentageCompleted = Math.round((progressEvent.loaded/progressEvent.total)*100);
                    setUploadPercentage(percentageCompleted);
                },
            });
            console.log(response.data);
        } catch(err){
            console.log(err.message);
        }
    }

    return(
        <>
            <div className="header-app my-4">
                <h1>Main Page of Frontend</h1>
            </div>

            <article>
                <form className="image-form" onSubmit={handleSubmit} encType="multipart/form-data">
                    <label htmlFor="input" className="my-3">Select file or Click a photo</label>
                    <input type="file" />
                    <button className="btn btn-success my-3" type="submit">Upload a file</button>
                </form>
            </article>

            {
                (uploadPercentage>0) && (
                    <div className="progress-div">
                        <div className="container text-center" style={{width:"50%"}}>
                            <div className="progress-bar progress-bar-striped progress-bar-animated bg-info" style={{width:`${uploadPercentage}%`}}>{uploadPercentage}%</div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default MainPage;