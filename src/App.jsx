import {useState} from "react";
import './App.css'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


function ResumeNavBar({
                          contactData,
                          handleInputChange,
                          handleImageChange,
                          handleDeleteSkill,
                          skill,
                          handleAddSkill,
                          setSkill,
                          skills,
                          job,
                          setJob,
                          handleJobsList,
                          setLink,
                          link,
                          onExport
                      }) {


    return <nav>
        <form>
            <fieldset className={"Personal"}>
                <div>
                    <label htmlFor={"img"}>Select an image</label>
                    <input id={"img"} type={"file"} accept="image/*" onChange={handleImageChange}/>
                </div>
                <div>
                    <label htmlFor={"name"}>Enter your name</label>
                    <input
                        id={"name"}
                        type="text"
                        name="name"
                        value={contactData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor={"email"}>Enter your email address</label>
                    <input
                        id={"email"}
                        type="email"
                        name="email"
                        value={contactData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor={"phone"}>Enter your phone number</label>
                    <input
                        id={"phone"}
                        type="tel"
                        name="phone"
                        value={contactData.phone}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <hr/>
            <fieldset className={"Education"}>
                <div>
                    <label htmlFor={"University"}>Enter your University name</label>
                    <input
                        id={"University"}
                        type={"text"}
                        name="education"
                        value={contactData.education}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <hr/>
            <fieldset className={"profile"}>
                <div>
                    <label htmlFor={"Profile"}>Enter your Profile Information</label>
                    <textarea
                        id={"profile"}
                        value={contactData.profile}
                        name="profile"
                        onChange={handleInputChange}
                        style={{width: "300px", height: "100px"}}
                    ></textarea>
                </div>
                <div>
                    <input
                        type="text"
                        value={skill}
                        onChange={(e) => setSkill(e.target.value)} // تحديث القيمة المدخلة
                        placeholder="Add Skill"
                    />
                    <button onClick={handleAddSkill}> Add Skill</button>
                </div>
                <ul>
                    {skills.map((sk, index) => (
                        <li key={index} className="skill-box">
                            <div style={
                                {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row"
                                }
                            }>
                                {sk}
                                <button onClick={(event) => {
                                    handleDeleteSkill(index)
                                    event.preventDefault()
                                }

                                } style={{marginLeft: '10px'}}>delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </fieldset>
            <hr/>
            <fieldset className={"experience"}>
                <h2>Add Your Projects</h2>
                <input
                    type={"text"}
                    name={"title"}
                    value={job.title}
                    onChange={(e) => setJob({...job, title: e.target.value})}
                    placeholder={'Enter project title'}
                />
                <p>start at</p>
                <input
                    type={"date"}
                    name={"firstDate"}
                    value={job.firstDate}
                    onChange={(e) => setJob({...job, firstDate: e.target.value})}
                    placeholder={"start at"}
                />
                <p>End at</p>
                <input
                    type={"date"}
                    name={"lastDate"}
                    value={job.lastDate}
                    onChange={(e) => setJob({...job, lastDate: e.target.value})}
                    placeholder={"end at"}
                />
                <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder={"project link"}
                />
                <textarea
                    name={"description"}
                    value={job.description}
                    onChange={(e) => setJob({...job, description: e.target.value})}
                    placeholder={"details about the project"}
                ></textarea>
                <button onClick={handleJobsList}>Add
                </button>
            </fieldset>
        </form>
        <button className={"Export"} onClick={onExport}>Export</button>
    </nav>
        ;
}

function ResumeBody({contactData, selectedImage, skills, jobs, convertLinkToAnchor, link}) {
    return (<div className={"resumeBody"}>
        <nav className={"contactInfo"}>
            <div className={"Personal"}>
                {selectedImage && (<img
                    src={selectedImage}
                    alt="Selected"
                    style={{width: "200px", height: "200px", borderRadius: "50%"}}
                />)}
                <h2>{contactData.name}</h2>
                <hr/>
                <p>{contactData.email}</p>
                <p>{contactData.phone}</p>
                <hr/>
            </div>
            <div className={"education"}>
                <h2>Education</h2>
                <p>{contactData.education}</p>
            </div>
            <div className={"skills"}>
                <h2>Skills</h2>
                <ul>
                    {
                        skills.map((skill, index) => (
                            <li key={index}>{skill}</li>))
                    }
                </ul>
            </div>
        </nav>
        <div className={"ProfileInformation"}>
            <div>
                <h2>Profile</h2>
                <p>{contactData.profile}</p>
            </div>
            <hr/>
            <div>
                <h2>EXPERIENCE</h2>
                <table>
                    <tbody>
                    {jobs.map((job, index) => (
                        <tr key={index}>
                            <td><span>{job.title}</span><br/><br/><p
                                style={{color: "gray", fontSize: "medium"}}>from{job.firstDate}<br/>to{job.lastDate}</p>
                            </td>
                            <td>{job.description}<br/> <br/>{convertLinkToAnchor(link)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>);
}


function ResumeLayout() {
    const [contactData, setContactData] = useState({
        name: "",
        email: "",
        phone: "",
        education: "",
        profile: "",
        skill: "",

    })
    const [job, setJob] = useState({
        title: "",
        firstDate: "",
        lastDate: "",
        description: "",
    })
    const [jobs, setJobs] = useState([])

    const [link, setLink] = useState(""); // لحفظ الرابط المدخل في input
    const convertLinkToAnchor = (link) => {
        if (link) {
            return (
                <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                </a>
            );
        }
        return null;
    };

    const [selectedImage, setSelectedImage] = useState(null);
    const [skill, setSkill] = useState("");
    const [skills, setSkills] = useState([]);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setContactData({
            ...contactData, [name]: value
        });
    };

    const handleJobs = (event) => {
        const {name, value} = event.target;
        setJob({
            ...job, [name]: value
        });
    };

    const handleJobsList = (event) => {
        event.preventDefault();

        // طباعة التواريخ للتأكد من وجود القيم
        console.log("First Date:", job.firstDate);
        console.log("Last Date:", job.lastDate);

        // التأكد من أن التواريخ موجودة قبل الإضافة
        if (job.firstDate && job.lastDate) {
            setJobs((prevJobs) => [...prevJobs, job]);
            setJob({firstDate: "", lastDate: ""});
            console.log(jobs)
        } else {
            console.log("Please enter both dates");
        }
    };


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleAddSkill = (e) => {
        e.preventDefault();
        if (skill.trim() !== "") {
            setSkills([...skills, skill]);
            setSkill("");
        }
    };

    const handleDeleteSkill = (index) => {
        const newSkills = skills.filter((_, i) => i !== index); // حذف المهارة بناءً على الفهرس
        setSkills(newSkills);
    };
    const exportToPDF = () => {
        const input = document.getElementsByClassName("resumeBody")[0];
        html2canvas(input, { scale: 3 }).then((canvas) => { // زيادة القيمة هنا
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('portrait', 'mm', 'a4'); // يمكنك أيضًا تغيير 'a4' إلى 'letter' إذا كنت بحاجة إلى حجم آخر
            const imgWidth = pdf.internal.pageSize.getWidth();
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save('resume.pdf');
        });
    };
    return (<>
        <ResumeNavBar
            contactData={contactData}
            job={job}
            jobs={jobs}
            handleJobsList={handleJobsList}
            setJob={setJob}
            handleInputChange={handleInputChange}
            handleJobs={handleJobs}
            handleImageChange={handleImageChange}
            handleAddSkill={handleAddSkill}
            handleDeleteSkill={handleDeleteSkill}
            skills={skills}
            skill={skill}
            setSkill={setSkill}
            link={link}
            setLink={setLink}
            onExport={exportToPDF}

        />
        <ResumeBody
            contactData={contactData}
            jobs={jobs}
            selectedImage={selectedImage}
            skills={skills}
            skill={skill}
            convertLinkToAnchor={convertLinkToAnchor}
            link={link}
        />
    </>)
}


export default function App() {
    return (<ResumeLayout/>)
}