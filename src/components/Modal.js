import "../App.css";

function Modal({children, visible}){
    return <div className="modal" style={{backgroundColor: "rgba(0, 0, 0, .7)",
    height: "100vh",
    width: "100vw",
    padding: 0,
    margin: 0,
    display: visible ? "flex" : "none",
    justifyContent: "center",
    alignItems: "center",
    }}><section style={{backgroundColor: "white",
    height: "500px",
    width: "500px",
    border: "4px solid navy",
    borderRadius: "20px",
    padding: 0,
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"}}>
        {children}
        </section></div>
}

export default Modal