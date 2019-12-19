import { IonAlert, IonImg, IonContent, IonLabel, IonAvatar, IonPage, IonList, IonItemSliding, IonItem, IonItemOptions, IonItemOption,
IonIcon } from
'@ionic/react';
import React, {useState} from 'react';


/* ------------------------------- Mood Store ------------------------------- */
import { MoodStore } from "../services/MoodService";

/* -------------------------- Emoji Mart and Icons -------------------------- */
import { Picker } from "emoji-mart";
import { Emoji } from "emoji-mart";
import { trash as trashIcon } from "ionicons/icons";
import {trash } from 'ionicons/icons';

/* ---------------------------------- MobX ---------------------------------- */
import { inject, observer } from "mobx-react";

type HistoryProps = {
moodStore: MoodStore;
};
const History: React.FC<HistoryProps> = ({ moodStore }) => {
    const printDate = (date: Date | string): string => {
    if (typeof date === "string") {
    date = new Date(date);
    }

    return date.toLocaleDateString();
    };
    const [removingMoodId, setRemovingMoodId] = useState<number>(0);
    return (
    <IonPage>
        <IonAlert
                isOpen={removingMoodId > 0}
                onDidDismiss={() => setRemovingMoodId(0)}
                header={"Remove Mood?"}
                message={`Sure you want to remove mood?`}
                buttons={[
                    {
                        text: "Cancel",
                        role: "cancel",
                        cssClass: "secondary",
                        handler: () => setRemovingMoodId(0)
                    },
                    {
                        text: "Yes, Remove It",
                        handler: () => {
                            moodStore.remove(removingMoodId);
                            setRemovingMoodId(0);
                        }
                    }
                ]}
            />
            
        <IonContent className="ion-padding">
            {moodStore.emptyHistory ? (<IonImg className="ion-padding" src="/assets/empty_state.svg"></IonImg>) : (
                <IonList>
                { moodStore.entries.map(mood => (
                <IonItemSliding key={mood.id}>
                    <IonItem>
                        <IonAvatar>
                            <Emoji emoji={mood.emoji} size={30} />
                        </IonAvatar>
                        <IonLabel>
                            <h3>{printDate(mood.date)}</h3>
                            <p>{mood.details || "No Details"}</p>
                        </IonLabel>
                    </IonItem>{" "}
                    <IonItemOptions side="end">
                        <IonItemOption color="danger"onClick={() => setRemovingMoodId(mood.id)}><IonIcon icon={trash}>
                            </IonIcon>
                        </IonItemOption>
                    </IonItemOptions>

                </IonItemSliding>
                ))}
            </IonList>
            )}
            </IonContent>
    </IonPage>
    );
    };

    export default inject("moodStore")(observer(History));