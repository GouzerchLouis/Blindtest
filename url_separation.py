import json
import re


def extraire_vers_json(fichier_entree, fichier_sortie, id_depart=1):
    regex_url = r"https://www\.youtube\.com/watch\?v=([^&]+)&list=[^\s]*"

    liste_chansons = []
    id_actuel = id_depart

    with open(fichier_entree, "r", encoding="utf-8") as f_in:
        for ligne in f_in:
            ligne = ligne.strip()
            if not ligne:
                continue

            match = re.search(regex_url, ligne)

            if match:
                video_id = match.group(1)
                url_complete = match.group(0)

                texte_nettoye = ligne.replace(url_complete, "").strip()

                bloc_chanson = {
                    "id": id_actuel,
                    "youtube_id": video_id,
                    "start": 25,
                    "answer": texte_nettoye,
                }

                liste_chansons.append(bloc_chanson)
                id_actuel += 1

    with open(fichier_sortie, "w", encoding="utf-8") as f_out:
        json.dump(liste_chansons, f_out, ensure_ascii=False, indent=2)

extraire_vers_json("chansons_entree.txt", "chansons_sortie.json", id_depart=148)