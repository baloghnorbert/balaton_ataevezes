import './list.style.css';

import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  IonContent, IonPage, IonList, IonHeader, IonInfiniteScroll,
  IonInfiniteScrollContent, IonTitle, IonToolbar, IonFooter, IonItem, IonIcon, NavContext
} from '@ionic/react';
import Loader from "react-loader-spinner";
import { addCircleOutline } from 'ionicons/icons';
import { WebAPI } from '../../service/webAPI';
import { Versenyzo } from '../../client/client';
import VersenyzoComponent from './versenyzo.component';

const ListPage: React.FC = () => {
  const [versenyzok, setVersenyzok] = useState<Versenyzo[]>([]);
  const [page, setPage] = useState<number>(0);
  const [disableInfinitScroll, setDisableInfinitScroll] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      fetchData();
      setIsLoading(false);
    }, 1000)
  }, []);

  const searchNext = async (e: CustomEvent<void>): Promise<void> => {
    await fetchData();
    (e.target as HTMLIonInfiniteScrollElement).complete();
  }

  const fetchData = async (): Promise<void> => {
    const data: Versenyzo[] = await WebAPI.Versenyzok.oldal(page);
    if (data && data.length > 0) {
      setVersenyzok([...versenyzok, ...data]);
      if (data.length < 3) {
        setDisableInfinitScroll(true);
      } else {
        setPage(page + 1);
      }
    } else {
      setDisableInfinitScroll(true);
    }
  }

  const { navigate } = useContext(NavContext);
  const redirectToCreatePage = useCallback(() => navigate("/create", "forward", "replace"), [navigate]);
  const redirectToEditPage = useCallback(() => navigate("/edit/", "forward", "replace"), [navigate]);

  const onDelete = async (id: number): Promise<void> => {
    const response: boolean = await WebAPI.Versenyzok.torles(id);
    if (response) {
      setVersenyzok(versenyzok.filter((x: Versenyzo) => x.rajtszam !== id));
    }
  }

  const loader = (): JSX.Element =>
    <div className="loader">
      <Loader type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        visible={isLoading}
      />
    </div>

  const list = (): JSX.Element =>
    <React.Fragment>
      <IonList>
        {
          versenyzok.map((data, index) => <VersenyzoComponent versenyzo={data} key={index}
            onDelete={(rajtaszam: number) => onDelete(rajtaszam)}
            onModify={(rajtaszam: number) => navigate(`/edit/${rajtaszam}`, "forward", "replace")}
          />)
        }
      </IonList>
      <IonInfiniteScroll
        onIonInfinite={e => searchNext(e)}
        threshold="50px"
        disabled={disableInfinitScroll}
      >
        <IonInfiniteScrollContent
          loadingSpinner="bubbles"
          loadingText="Loading more data..."
        >
        </IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </React.Fragment>

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Balaton Átevezés</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        {
          isLoading ? loader() : list()
        }


      </IonContent>
      <IonFooter>
        <IonItem>
          <IonIcon slot="end" icon={addCircleOutline}
            color="primary"
            onClick={() => redirectToCreatePage()} />

        </IonItem>
      </IonFooter>
    </IonPage>
  );
};

export default ListPage;
