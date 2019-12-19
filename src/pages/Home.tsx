import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonAlert,
  IonToast
} from "@ionic/react";
import React, { useState } from "react";
import { Picker, EmojiData } from "emoji-mart";
/* ------------------------------- MobX Vars ------------------------------ */
import { inject, observer } from "mobx-react";
import { MoodStore } from "../services/MoodService";

type HomeProps = {
  moodStore: MoodStore,
};

const Home: React.FC<HomeProps> = ({moodStore}) => {

  const [showInputs, setShowInputs] = useState(false);
  const [emoji, setEmoji] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);

  const handleEmojiSelect = (selection: EmojiData) => {
    setEmoji(selection);
    setShowInputs(true);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <Picker
          title="Mood Board"
          include={["people"]}
          onSelect={handleEmojiSelect}
        />
        <IonAlert
          isOpen={showInputs}
          subHeader="Log your mood and some more info..."
          onDidDismiss={() => setShowInputs(false)}
          header={`Why do you feel how you feel?`}
          inputs={[
            {
              type: "text",
              name: "details",
              placeholder: "Write about how you're feeling..."
            },
            {
              name: "date",
              type: "date",
              max: `{new Date()}`,
              min: "2017-09-09",
              value: new Date(),
              placeholder: "Change date"
            }
          ]}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              cssClass: "secondary",
              handler: () => {
                setShowInputs(false);
                setEmoji(null);
              }
            },
            {
              text: "Ok",
              handler: data => {
                moodStore.save(emoji, data.details, data.date);
                setShowToast(true);
              }
            }
          ]}
        />
        <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Mood Logged."
        duration={200}
      />
      </IonContent>
    </IonPage>
  );
};

export default inject("moodStore")(observer(Home));