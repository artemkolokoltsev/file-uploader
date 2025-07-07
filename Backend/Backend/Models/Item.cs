namespace Backend.Models;

public class Item
{
    public string id { get; set; }
    public RecData rec { get; set; }
    public NerData ner { get; set; }
    public ClaData cla { get; set; }
    public string[] status { get; set; }
}