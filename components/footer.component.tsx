"use client";

export default function Footer() {
    return (
        <div className="footer-wrapper"
            style={
                {
                    position: "fixed",
                    left: "0",
                    bottom: "0",
                    width: "100vw",
                    height: "60px",
                    backgroundColor: "#97ceb2",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                }
            }>
            <ul className="socials" style={{
                display: "flex",
                flexDirection: "row",
                listStyle: "none",
            }}>
                <li style={{
                    margin: "0px 10px"
                }}>
                    <a href="" className="ref-test"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                </li>
                <li style={{
                    margin: "0px 10px"
                }}>
                    <a href="" className="ref-test"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
                </li>
                <li style={{
                    margin: "0px 10px"
                }}>
                    <a href="" className="ref-test">X</a>
                </li>
                <li style={{
                    margin: "0px 10px"
                }}>
                    <a href="" className="ref-test"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                </li>
            </ul>
            <ul className="impressumdatenschutz" style={{
                display: "flex",
                flexDirection: "row",
                listStyle: "none",
            }}>
                <li className="impressum" style={{
                    margin: "0px 10px"
                }}>
                    <a href="" className="ref-test">Impressum</a>
                </li>
                <li className="datenschutz" style={{
                    margin: "0px 10px"
                }}>
                    <a href="" className="ref-test">Datenschutz</a>
                </li>
            </ul>
        </div>
    )
}