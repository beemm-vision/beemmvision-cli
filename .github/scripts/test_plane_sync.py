"""Tests de plane_sync.find_reference (BV-636, audit run-3 CLI #4).

Lancer : python3 -m unittest discover -s .github/scripts -p 'test_*.py'
"""
import importlib.util
import os
import unittest

_HERE = os.path.dirname(os.path.abspath(__file__))
_spec = importlib.util.spec_from_file_location(
    "plane_sync", os.path.join(_HERE, "plane_sync.py"))
plane_sync = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(plane_sync)


def pr(ref="feat/x", title="", body="", user_type="User"):
    return {"head": {"ref": ref}, "title": title, "body": body,
            "user": {"type": user_type, "login": "u"}}


class FindReference(unittest.TestCase):
    def test_branche_bv(self):
        self.assertEqual(plane_sync.find_reference(
            pr(ref="feat/BV-101-x"), "BV"), ("BV", 101))

    def test_titre_bv(self):
        self.assertEqual(plane_sync.find_reference(
            pr(title="[BV-7] Truc"), "BV"), ("BV", 7))

    def test_ligne_plane_dans_le_corps_humain(self):
        self.assertEqual(plane_sync.find_reference(
            pr(body="Plane: BV-42"), "BV"), ("BV", 42))

    def test_autre_projet_ignore(self):
        # Un repo BV ne déplace jamais un item PB ou LAB.
        self.assertIsNone(plane_sync.find_reference(
            pr(title="Voir PB-12 et LAB-3"), "BV"))

    def test_autre_projet_avant_bv(self):
        self.assertEqual(plane_sync.find_reference(
            pr(title="PB-12 puis [BV-9]"), "BV"), ("BV", 9))

    def test_corps_d_une_pr_de_bot_ignore(self):
        # Notes de version tierces d'une PR Dependabot : ne choisissent rien.
        self.assertIsNone(plane_sync.find_reference(
            pr(ref="dependabot/npm_and_yarn/x-1.2.3", title="Bump x",
               body="fixes BV-5 upstream", user_type="Bot"), "BV"))

    def test_corps_branche_dependabot_ignore_meme_sans_type(self):
        self.assertIsNone(plane_sync.find_reference(
            pr(ref="dependabot/npm_and_yarn/x", body="BV-5"), "BV"))

    def test_titre_d_une_pr_de_bot_garde(self):
        self.assertEqual(plane_sync.find_reference(
            pr(ref="dependabot/x", title="[BV-8] Bump", user_type="Bot"),
            "BV"), ("BV", 8))

    def test_ligne_plane_ancree_lue_sur_une_pr_de_bot(self):
        # L'autocreation reinjecte « Plane: BV-N » dans le corps : elle doit
        # rester lue aux evenements suivants, meme sur une PR de bot.
        self.assertEqual(plane_sync.find_reference(
            pr(ref="dependabot/x", body="notes BV-5\n\nPlane: BV-77",
               user_type="Bot"), "BV"), ("BV", 77))

    def test_cle_vide(self):
        self.assertIsNone(plane_sync.find_reference(pr(title="BV-1"), ""))


if __name__ == "__main__":
    unittest.main()
