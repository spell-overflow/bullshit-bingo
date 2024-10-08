import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export default function Home() {
  return (
    <div>
      <div className="min-w-3xl m-3 rounded-xl bg-primary p-4 pt-2 text-primary-foreground sm:max-w-md">
        <Accordion type="single" collapsible className="my-6 w-full">
          <h2 className="mb-2 text-3xl font-bold">About</h2>
          <AccordionItem value="item-1">
            <AccordionTrigger>What is the Bullshit Bingo app?</AccordionTrigger>
            <AccordionContent>
              The Bullshit Bingo app is an entertaining game that is
              characterized by everyday, unavoidable tasks or annoying events.
              was inspired. Instead of getting annoyed about these things, you
              can them in a bingo board and playfully manage or tick them off.
              or tick them off.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What happens if I have fewer than 25 terms?
            </AccordionTrigger>
            <AccordionContent>
              You can add your own terms or tasks using the input field. Simply
              enter the desired text and add it to your list.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Will my entries and the playing field be saved?
            </AccordionTrigger>
            <AccordionContent>
              Yes. You can easily logout and come back later. Your playfield and
              entries will be saved.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Who developed the Bullshit Bingo app?
            </AccordionTrigger>
            <AccordionContent>
              The Bullshit Bingo app is a project by Anneke Hugenberg. The app
              was created as a training project for web development.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>
              Where did the idea for the Bullshit Bingo app come from?
            </AccordionTrigger>
            <AccordionContent>
              {`In the winter of 2021, I was working in the orthopaedic department
              of a hospital. It was Monday morning, 2 colleagues were sick, I
              had overslept and didn't have time for a coffee before I left the
              house and I was sitting in the doctor's room with my favorite
              colleague preparing discharges and the upcoming ward round when a
              nurse came in and told us that the patient who was to be taken to
              the operating room in 5 minutes was munching on a bread roll. He
              was therefore not sober and could not be operated on. For us and
              our colleagues, this meant a mountain of additional work and
              organization (changes to the operating schedule, who would be the
              first to be operated on instead? Is he already there and
              prepared...). Something like this happened from time to time,
              although everyone involved actually knows that patients are not
              allowed to eat on the day of surgery... There are probably things
              like that in every job. Things that you just can't get rid of
              completely, that keep happening again and again, they get on your
              nerves but there's nothing you can do other than to reschedule and
              get as annoyed as possible. That's how the idea of playing
              bullshit bingo with colleagues was born. And to write these things
              in the boxes. So at least there was something positive about it
              that we could be happy about and which sweetened the working day a
              little.`}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
