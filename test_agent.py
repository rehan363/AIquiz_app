import asyncio
from google.adk.runners import InMemoryRunner
from src.app.agent.core import get_educator_agent

async def test_agent():
    try:
        print("Testing agent generation...")
        
        # Get the educator agent
        educator_agent = get_educator_agent()
        print("✅ Agent loaded successfully")
        
        # Create a runner
        runner = InMemoryRunner(agent=educator_agent, app_name="agents")
        print("✅ Runner created successfully")
        
        # Test with a simple topic
        prompt = "Please generate a professional quiz about JavaScript."
        print(f"🔄 Generating quiz for: {prompt}")
        
        # Execute the agent
        events = await runner.run_debug(
            user_messages=prompt,
            quiet=True
        )
        
        print(f"✅ Agent execution completed. Events count: {len(events)}")
        
        # Print the events
        for i, event in enumerate(events):
            print(f"Event {i}: {event}")
            
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_agent())