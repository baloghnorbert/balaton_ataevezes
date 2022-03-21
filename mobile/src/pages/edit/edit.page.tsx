import "./edit.style.css"

import React, { useCallback, useContext, useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Loader from "react-loader-spinner";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonRow, IonButton, NavContext } from "@ionic/react";
import { KategiriaSelectList } from "../../library/hooksFormControlls/components/hookFormSelectlist";
import { Kategoria, Versenyzo, VersenyzoRequest } from "../../client/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import HookFormTextBox from "../../library/hooksFormControlls/components/hookFomTextBox";
import HookFormDateTimePicker from "../../library/hooksFormControlls/components/hookFormDateTimePicker";
import { WebAPI } from "../../service/webAPI";
import { validationSchema } from "./validation";

interface IProps extends RouteComponentProps<{ rajtszam: string }> { }

const EditPage: React.FC<IProps> = (props: IProps): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [kategoriak, setKategoriak] = useState<Kategoria[]>([]);
    const [versenyzo, setVersenyzo] = useState<Versenyzo>();

    const { control, handleSubmit, formState: { errors }, formState, reset } = useForm<Versenyzo>
        ({
            mode: "onChange",
            resolver: yupResolver(validationSchema)
        });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async (): Promise<void> => {
        const rajtszam: number = +props.match.params.rajtszam;

        let [versenyzo, kategoriaLista] = await Promise.all
            ([
                WebAPI.Versenyzok.rajtszam(rajtszam),
                WebAPI.Kategoriak.mind()
            ]);

        setVersenyzo(versenyzo);
        setKategoriak(kategoriaLista);

        await insertData(versenyzo);

        setIsLoading(false);
    }

    const insertData = async (data: Versenyzo): Promise<void> => {
        reset({
            id: data.id,
            nev: data.nev,
            rajtszam: data.rajtszam,
            szuletesiEv: data.szuletesiEv,
            iranyzitoszam: data.iranyzitoszam,
            telepules: data.telepules,
            lakcim: data.lakcim,
            kategoria: data.kategoria
        })
    }

    const onSubmit = async (data: VersenyzoRequest): Promise<void> => {
        console.log("fsdfsdfsdfsdfsdfsdfsdfdsfds");
        await WebAPI.Versenyzok.nevezes(data);
        redirectToHomePage();
    };


    const { navigate } = useContext(NavContext);
    const redirectToHomePage = useCallback(() => navigate("home", "forward"), [navigate]);
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
                        <HookFormTextBox name="iranyzitoszam"
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

export default withRouter(EditPage);