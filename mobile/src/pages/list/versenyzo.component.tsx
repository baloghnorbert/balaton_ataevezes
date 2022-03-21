import React from 'react';
import { IonItem,  IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonIcon} from '@ionic/react';
import {  pencilOutline, trashOutline } from "ionicons/icons";
import { Versenyzo } from '../../client/client';
import './versenyzo.style.css';
import { WebAPI } from '../../service/webAPI';


interface IProps {
    versenyzo: Versenyzo;
    onDelete: (id: number) => void;
    onModify: (id: number) => void;
}

const VersenyzoComponent: React.FC<IProps> = (props: IProps): JSX.Element => {

    const onDelete = async (): Promise<void> => {
        props.onDelete(props.versenyzo.rajtszam!);
    }
    const onModify = async (): Promise<void> => {
        props.onModify(props.versenyzo.rajtszam!);
    }  

    const imageLing = (category: string): string => {
        switch (category) {
            case "SUP":
                return "./assets/images/sup.jpg";
            case "Kenu":
                return "./assets/images/kanu.png";
            case "Kajak":
                return "./assets/images/kajak.png";
            case "Sarkanyhajo_10":
                return "./assets/images/dragonboat_10.png";
            case "Sarkanyhajo_20":
                return "./assets/images/dragonboat_20.png";
            case "Vizibicikli_2":
                return "./assets/images/bicycle.png";
            default:
                return "";
        }
    }

    const getBithYear = (date: Date) => date.toLocaleString().split('T')[0];

    return (
        <IonItemSliding>
            <IonItem>
                <img className="list_img" src={imageLing(props.versenyzo.kategoria!)} alt={props.versenyzo.nev!} />
                <IonLabel>
                    <h3>
                        <i>{props.versenyzo.rajtszam}</i>
                    </h3>
                    <h2>{props.versenyzo.nev} ({getBithYear(props.versenyzo.szuletesiEv)})</h2>
                    <h3>{props.versenyzo.iranyzitoszam} {props.versenyzo.telepules} {props.versenyzo.lakcim}</h3>
                </IonLabel>
            </IonItem>

            <IonItemOptions side="end">

            </IonItemOptions>
            <IonItemOptions side="end">
                <IonItemOption onClick={() => onDelete()} color="danger">
                    <IonIcon icon={trashOutline} color="light" />
                </IonItemOption>
                <IonItemOption onClick={() => onModify()} color="tertiary">
                    <IonIcon icon={pencilOutline} color="light" />
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    );
}

export default VersenyzoComponent;

