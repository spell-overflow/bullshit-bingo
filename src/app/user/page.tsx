export default function User(): JSX.Element {
  return (
    <div className="bg-card text-card-foreground">
      card
      <div className="bg-primary text-primary-foreground">primary</div>
      <div className="bg-secondary text-secondary-foreground">secondary</div>
      <div className="bg-muted text-muted-foreground">muted</div>
      <div className="bg-accent text-accent-foreground ">accent</div>
      <div className="bg-destructive text-destructive-foreground">
        destructive
      </div>
      <div className="text-input-foreground bg-input">input</div>
      <div className="bg-popover text-popover-foreground">popover</div>
    </div>
  );
}
