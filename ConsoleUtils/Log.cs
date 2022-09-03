namespace ConsoleUtils;

public static class Log
{
    public static void WriteLine(object input, ConsoleColor color = ConsoleColor.White)
    {
        Console.ForegroundColor = color;
        Console.WriteLine(input);
        Console.ForegroundColor = ConsoleColor.White;
    }  
    
    public static void Write(object input, ConsoleColor color = ConsoleColor.White)
    {
        Console.ForegroundColor = color;
        Console.Write(input);
        Console.ForegroundColor = ConsoleColor.White;
    } 
    
    public static void WriteLineWithDate(object input, ConsoleColor color = ConsoleColor.White)
    {
        Console.ForegroundColor = color;
        Console.Write($"[{DateTime.Now:G}] ", ConsoleColor.DarkGray);
        Console.WriteLine(input);
        Console.ForegroundColor = ConsoleColor.White;
    }  
}