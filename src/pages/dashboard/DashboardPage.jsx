import { useNavigate } from "react-router-dom";
import "./DashboardPage.css";

export const DashboardPage = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate("/posts");
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-box">
                <div className="dashboard-logo">📘</div>
                <h1 className="dashboard-title">BlogSystemPu</h1>
                <p className="dashboard-subtitle">
                    Tu espacio para compartir ideas y aprender juntos.
                </p>
                <button className="dashboard-button" onClick={handleRedirect}>
                    Ir a la página principal
                </button>
            </div>
        </div>
    );
};