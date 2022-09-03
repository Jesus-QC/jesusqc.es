using System.Diagnostics;
using System.Reflection;

namespace ConsoleUtils;

public static class CommandHandler
{
    private static Dictionary<string, MethodInfo> _registeredCommands = new ();

    public static void Register<T>() where T : class
    {
        foreach (var method in typeof(T).GetMethods())
        {
            if(!method.IsPublic || !method.IsStatic)
                return;

            var name = method.Name.ToLower();

            if (_registeredCommands.ContainsKey(name))
            {
                Log.WriteLine($"[CommandHandler] Couldn't register the command: {name}. Already registered.", ConsoleColor.DarkYellow);
            }
            else
            {
                _registeredCommands.Add(name, method);
                Log.Write($"[CommandHandler] Registered the command: ", ConsoleColor.Green);
                Log.WriteLine(name, ConsoleColor.DarkCyan);
            }
        }
    }
    
    public static Task Run()
    {
        for (;;)
        {
            var input = Console.ReadLine();
            
            if(input == null)
                continue;
            
            HandleInput(input);
        }
    }

    private static void HandleInput(string input)
    {
        input = input.ToLower();
        
        if (!_registeredCommands.ContainsKey(input))
        {
            Log.WriteLine($"Command {input} was not found.", ConsoleColor.Yellow);
            return;
        }

        var timer = new Stopwatch();
        
        timer.Start();
        _registeredCommands[input].Invoke(null, null);
        timer.Stop();
        
        Log.WriteLine($"Command executed. ({timer.ElapsedMilliseconds}ms)", ConsoleColor.Yellow);
    }
}