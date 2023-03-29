using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace BackEnd.Controllers
{
    [ApiController]
    public class FlashCardController : Controller
    {
        private readonly FlashCardContext _context;

        public FlashCardController(FlashCardContext context)
        {
            _context = context;
        }

        [Route("api/Flashcards")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FlashCard>>> GetAll()
        {
            try
            {
                return await _context.FlashCards.ToListAsync();
            }
            catch
            {
                return BadRequest();
            }
        }

        [Route("api/Flashcards")]
        [HttpPost]
        public async Task<ActionResult<FlashCard>> PostFlashCard(FlashCard fc)
        {
            int attempts = 0;

            while (attempts < 1000)
            {
                try
                {
                    fc.id = Guid.NewGuid();
                    _context.FlashCards.Add(fc);
                    await _context.SaveChangesAsync();
                    return fc;
                }
                catch
                {
                    attempts++;
                }
            }

            return BadRequest("Unable to Create the Flash Card");
        }

        [Route("api/Flashcards/{id}")]
        [HttpGet]
        public async Task<ActionResult<FlashCard>> GetFlashCard(Guid id)
        {
            var card = await _context.FlashCards.FindAsync(id);

            if (card is null) return NotFound();

            return card;
        }

        [Route("api/Flashcards/{id}")]
        [HttpPut]
        public async Task<ActionResult<FlashCard>> PutFlashCard(Guid id, FlashCard fc)
        {
            if (id != fc.id)
            {
                return BadRequest("Ids did not match");
            }

            var card = _context.FlashCards.Where(c => c.id == id).FirstOrDefault<FlashCard>();
            if (card != null)
            {
                card.question = fc.question;
                card.answer = fc.answer;

                await _context.SaveChangesAsync();
                return card;
            }
            else
            {
                return NotFound();
            }
        }

        [Route("api/Flashcards/{id}")]
        [HttpDelete]
        public async Task<ActionResult<FlashCard>> DeleteFlashCard(Guid id)
        {
            var card = _context.FlashCards.Where(c => c.id == id).FirstOrDefault<FlashCard>();
            if (card != null)
            {
                _context.FlashCards.Remove(card);
                await _context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return NotFound();
            }
            
        }
    }
}
