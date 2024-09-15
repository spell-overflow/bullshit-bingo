import Link from "next/link";
import { Button } from "~/components/ui/button";
import Lettering from "../_components/lettering";
import Bubble from "../_components/bubble";

export default function Home() {
  return (
    <div className="mx-auto">
      <div className="w-full text-center">
        <div className="inline-block align-middle">
          <Lettering />
        </div>
        <div className="inline-block align-middle">
          <Bubble />
        </div>
      </div>
      <Link href={"/"} className="flex justify-center">
        <Button>Return to Bingo</Button>
      </Link>
      <div className="my-4 rounded-lg bg-accent p-4 text-card-foreground shadow">
        <div className="prose dark:prose-invert">
          <h1>Impressum</h1>
          <p>Angaben gemäß § 5 DDG</p>
          <p>
            Anneke Hugenberg <br />
            Am Tannenkamp 15 <br />
            49088 Osnabrück <br />
          </p>
          <h4>Vertreten durch: </h4>
          <p>
            Anneke Hugenberg
            <br />
          </p>
          <h4>Kontakt:</h4>
          <p>
            Telefon: 0541-97332405 <br />
            E-Mail:{" "}
            <a
              href="mailto:Annekehugenberg@proton.me"
              className="hover:underline"
            >
              Annekehugenberg@proton.me
            </a>
          </p>
          <h2>Haftungsausschluss: </h2>
          <h3>Haftung für Inhalte</h3>
          <p>
            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für
            die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können
            wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir
            gemäß § 7 Abs.1 DDG für eigene Inhalte auf diesen Seiten nach den
            allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir
            als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
            gespeicherte fremde Informationen zu überwachen oder nach Umständen
            zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
            Informationen nach den allgemeinen Gesetzen bleiben hiervon
            unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
            Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
            Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
            Inhalte umgehend entfernen.
          </p>
          <h3>Haftung für Links</h3>
          <p>
            Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
            Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
            fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
            verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
            der Seiten verantwortlich. Die verlinkten Seiten wurden zum
            Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
            Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
            erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten
            Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung
            nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
            derartige Links umgehend entfernen.
          </p>
          <h3>Urheberrecht</h3>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
            diesen Seiten unterliegen dem deutschen Urheberrecht. Die
            Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            Downloads und Kopien dieser Seite sind nur für den privaten, nicht
            kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser
            Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
            Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
            gekennzeichnet. Sollten Sie trotzdem auf eine
            Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
            entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
            werden wir derartige Inhalte umgehend entfernen.
          </p>
          <h3>Datenschutz</h3>
          <p>
            Die Nutzung unserer Webseite ist in der Regel ohne Angabe
            personenbezogener Daten möglich. Soweit auf unseren Seiten
            personenbezogene Daten (beispielsweise Name, Anschrift oder
            eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets
            auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche
            Zustimmung nicht an Dritte weitergegeben. <br />
            Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B.
            bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann.
            Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist
            nicht möglich. <br />
            Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten
            Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich
            angeforderter Werbung und Informationsmaterialien wird hiermit
            ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich
            ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung
            von Werbeinformationen, etwa durch Spam-Mails, vor.
          </p>
          Impressum vom{" "}
          <a href="https://www.impressum-generator.de">
            Impressum Generator
          </a>{" "}
          der{" "}
          <a
            href="https://www.kanzlei-hasselbach.de/standorte/bonn/"
            rel="nofollow"
          >
            Kanzlei Hasselbach, Bonn
          </a>{" "}
        </div>
      </div>
      <Link href={"/"} className="mb-4 flex justify-center">
        <Button>Return to Bingo</Button>
      </Link>
    </div>
  );
}