import "./create.style.css"

import React, { useCallback, useContext, useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { WebAPI } from "../../service/webAPI";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonRow, IonButton, NavContext 
} from "@ionic/react";
import { useForm } from "react-hook-form";
import HookFormTextBox from "../../library/hooksFormControlls/components/hookFomTextBox";
import { Kategoria, VersenyzoRequest } from "../../client/client";
import { KategiriaSelectList } from "../../library/hooksFormControlls/components/hookFormSelectlist";
import HookFormDateTimePicker from "../../library/hooksFormControlls/components/hookFormDateTimePicker";
import { validationSchema } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";

const CreatePage: React.FC = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [kategoriak, setKategoriak] = useState<Kategoria[]>([]);

    const { control, handleSubmit, formState: { errors } } = useForm<VersenyzoRequest>
        ({
            mode: "onChange",
            resolver: yupResolver(validationSchema)
        });

    useEffect(() => {
        fetchData();
    }, []);

    const { navigate } = useContext(NavContext);
    const redirectToHomePage = useCallback(() => navigate("/", "forward"), [navigate]);

    const fetchData = async (): Promise<void> => {
        const data: Kategoria[] = await WebAPI.Kategoriak.mind();

        setKategoriak(data);
        setIsLoading(false);
    }

    const onSubmit = async (data: VersenyzoRequest): Promise<void> => {
        await WebAPI.Versenyzok.nevezes(data);
        redirectToHomePage();
    };

    const loader = (): JSX.Element =>
        <div className="loader">
            <Loader type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                visible={isLoading}
            />
        </div>

    const form = (): JSX.Element =>
        <IonGrid>
            <form onSubmit={handleSubmit((data: VersenyzoRequest) => onSubmit(data))}>
                <IonRow>
                    <IonCol sizeXs="12">
                        <HookFormTextBox name="nev"
                            label="Név"
                            type="text"
                            control={control}
                            errors={errors} />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol sizeXs="12">
                        <HookFormDateTimePicker name="szuletesiEv"
                            label="Születési dátum"
                            control={control}
                            errors={errors}
                            endDate={new Date()} />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol sizeXs="12">
                        <HookFormTextBox name="iranyitoszam"
                            label="Írányítószám"
                            type="text"
                            control={control}
                            errors={errors} />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol sizeXs="12">
                        <HookFormTextBox name="telepules"
                            label="Település"
                            type="text"
                            control={control}
                            errors={errors} />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol sizeXs="12">
                        <HookFormTextBox name="lakcim"
                            label="Lakcím"
                            type="text"
                            control={control}
                            errors={errors} />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol sizeXs="12">
                        <KategiriaSelectList name="kategoria"
                            label="Kategória"
                            control={control}
                            errors={errors}
                            valueMember={(field: Kategoria) => field.id!}
                            displayMember={(field: Kategoria) => field.name!}
                            data={kategoriak} />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol sizeXs="12">
                        <IonButton expand="block" type="submit" className="ion-margin-top"
                            disabled={false}>
                            MENTÉS
                        </IonButton>
                    </IonCol>
                </IonRow>
            </form>
        </IonGrid>

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Balaton Átevezés
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {
                    isLoading ? loader() : form()
                }
            </IonContent>
        </IonPage>
    );
}

export default CreatePage;

