import { useEffect } from "react";
import { useHistory } from "react-router";

export default function Reload() {
        const hist = useHistory();
        useEffect(() => {
		hist.goBack();
	}, [hist])
        return (
                <div> </div>
        )
}
