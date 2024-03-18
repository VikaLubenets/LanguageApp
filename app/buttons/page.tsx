import { Button } from "@/components/ui/button";

const ButtonsPage = () => {
  return (
    <div className="p-4 space-y-4 flex flex-col max-w-[200px]">
      <Button >Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="primaryOutline">Primary outline</Button>
      <Button variant="secondary">Primary</Button>
      <Button variant="secondaryOutline">Primary outline</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="dangerOutline">Danger outline</Button>
      <Button variant="super">super</Button>
      <Button variant="superOutline">Super outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="sidebar">Side bar</Button>
      <Button variant="sidebarOutline">Side bar outline</Button>
    </div>
  )
}

export default ButtonsPage;